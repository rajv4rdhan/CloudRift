import boto3
import gzip
from io import BytesIO
from datetime import datetime, timezone

s3 = boto3.client('s3')
bucket = 'adcvd3sdcds31'
log_prefix = 'AWSLogs/aws-account-id=991634955970/CloudFront/DistributionId=ED4BEGG8VTD32/'

def lambda_handler(event, context):
    usernames = event.get('usernames', [])
    last_processed = event.get('last_processed', '1970-01-01T00:00:00Z')
    last_processed_dt = datetime.fromisoformat(last_processed.replace('Z', '+00:00'))

    stats = {user: {'visitors': set(), 'bandwidth': 0} for user in usernames}
    latest_ts = last_processed_dt

    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=bucket, Prefix=log_prefix)

    for page in pages:
        for obj in page.get('Contents', []):
            key = obj['Key']
            # Extract timestamp from filename: e.g., ...2025-04-11-14.91514f1a.gz
            try:
                parts = key.split('/')[-1].split('.')
                ts_str = parts[1]  # 2025-04-11-14
                log_time = datetime.strptime(ts_str, "%Y-%m-%d-%H").replace(tzinfo=timezone.utc)
            except Exception:
                continue

            if log_time <= last_processed_dt:
                continue  # skip old logs

            if log_time > latest_ts:
                latest_ts = log_time

            # Read and parse log file
            gz_obj = s3.get_object(Bucket=bucket, Key=key)
            with gzip.GzipFile(fileobj=BytesIO(gz_obj['Body'].read())) as gz:
                for line in gz.read().decode().splitlines():
                    if line.startswith('#') or not line.strip():
                        continue

                    parts = line.split('\t')
                    if len(parts) < 12:
                        continue

                    ip = parts[4]
                    uri = parts[7]
                    bytes_sent = int(parts[3])

                    for user in usernames:
                        if f'/{user}/' in uri:
                            stats[user]['visitors'].add(ip)
                            stats[user]['bandwidth'] += bytes_sent

    result = {
        user: {
            'visitors': len(stats[user]['visitors']),
            'bandwidth_mb': round(stats[user]['bandwidth'] / (1024 * 1024), 2)
        } for user in usernames
    }
    result['last_processed'] = latest_ts.isoformat()

    return result


def months_to_minutes(months):
    # There are approximately 30.44 days in a month on average (365.25/12)
    # There are 24 hours in a day
    # There are 60 minutes in an hour
    minutes_per_month = 30.44 * 24 * 60
    return int(months * minutes_per_month)

print(months_to_minutes(6))


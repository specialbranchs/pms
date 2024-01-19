from datetime import datetime

def convertStringToDateObj(datestring):
    dt = datetime.strptime(datestring, '%Y-%m-%d')
    return dt
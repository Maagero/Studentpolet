import pandas as pd
import datetime


df = pd.read_csv('produkter.csv',";")

def convert_float(temp):
    return float(str(temp).replace(',','.'))

for columns in df:
    if columns=='Datotid' or not isinstance(df[columns].iloc[0],str):
        continue
    if df[columns].iloc[0][0].isdigit():
        df[columns] = df[columns].apply(convert_float)

def no_null(value):
    if isinstance(value,float):
        return int(value)
    print(value)
    return 0

df['Alkohol'] = df['Alkohol'].apply(no_null)

df['AlkoholPrKrone']= df.apply(lambda row: row['Alkohol']/row['Pris'], axis=1)

df.to_csv('processedproducts.csv',sep=',')



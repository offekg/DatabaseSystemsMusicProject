import csv
import requests
from bs4 import BeautifulSoup

url = ("https://kworb.net/spotify/country/us_weekly.html")
page = requests.get(url)
file_name="us.csv"
with open(file_name, 'w') as csv_file:
    soup = BeautifulSoup(page.text, 'html.parser')
    print (soup.prettify())

 <col class="col-title"/>

< col class ="col-total" / >




'''
with open('csv_files/countries.csv','r',encoding="utf-8-sig") as csvfile:
    countriesCSV = csv.reader(csvfile, delimiter=',')
    for row in countriesCSV:
        country = str(row[0].replace(" ", "_"))
        url = ("https://kworb.net/spotify/country/" + country +".html")
        page = requests.get(url)
        file_name=country+".csv"
        with open(file_name, 'w') as csv_file:
            soup = BeautifulSoup(page.text, 'html.parser')
            print (soup.prettify())
'''
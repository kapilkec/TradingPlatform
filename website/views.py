from flask import Blueprint, render_template, request, flash, jsonify
from firebase_admin import credentials
from firebase_admin import db
import firebase_admin
import datetime as dt
# import nltk
# from nltk.sentiment.vader import SentimentIntensityAnalyzer
from GoogleNews import GoogleNews
from newspaper import Article
from newspaper import Config

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
   return render_template("index.html" )

@views.route('/market', methods=['GET', 'POST'])
def market():
    # print(request.get_json()['uid'])
    return render_template("market.html")


@views.route('/portfolio', methods=['GET', 'POST'])
def portfolio():
    return render_template("portfolio.html" )

@views.route('/watchlist', methods=['GET', 'POST'])
def watchlist():
    return render_template("watchlist.html")



def getPortfolioNews():
    cred = credentials.Certificate({
    "type": "service_account",
    "project_id": "vtrade-1333d",
    "private_key_id": "019af47e9664be53d5fc42e8d076937f5439ef08",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkNavxmgCUtffk\n6MUOru6M94GzPt3Wp5+1URWYiEcQ823M6e2MsR1QOkXWuxyy+rOUXIZpftfSs/H5\nVdy9X+WD9xoeIYoSyZguzt91jmfoIdwk7uWemrfSYVdGEMGO6fgpjBkhDQkbSgLB\nIJVqYWOMFelLB6mL2Yp9hctIy2EyqXTXvCpckdf5l+NIS5nL3r54b65hdKn3veZ9\nUW/S7TSRH7IZJaLdUQww/weiwrpPZDB42k0GjBo8swq02YL2upur7u1Q6Cv/zwUS\nZbYSdUpJUK+B4YEoQULwFVlLiFUacFff9QoBxAd0ocskc2rZNgWOQIFS2ePysVav\n4Y9p32ehAgMBAAECggEACgLcvyWNXvi4nj8j3egIqQB2nSFl4/PIitC6zM01qOW0\n7Gdat3BRo+Jai/f7Y1KiLCD++IPK/gBM3i5JF7msPOTLLYU1JGvZlDwZC3Qq1MEf\ngjNEuXd6Fu2UQYucoiNbcp8lvxBuVNcjVcuTIm6RSmTvrg3w/ySU8bq71z6szecR\n8uUyZuw9gLAQzzVn0X17o2THOVIn+6ektPF/WbtaqKhB1HOuzA9o/nYic2pPzWFk\nGiIGfxD1zPrGsGbXAtsO6uLEtj7FHVP4IZzXX0WGUk0ReAjVLlrl8voY08hNCD7T\nDL0XtLLF1LGbc/P41lx+yjB5imHRw3MnlH1KmGLxEQKBgQD7g3t+4HxPuL4lIAuD\nXbWbAG8mGrcW6Dv+Rezex97H21/YOLtzkAtsyxf5hheJ+aXZ41ij979HjZv5Qjz8\nzuBcZ1lPxWTzKREbXkSdkpJPET5U7h4+emQVtqApU4ZmDTc0t0DHkc731dIlmI1f\nQKxMBDfTFTnFVQnbKzsrdRDo/QKBgQDoR8YHz+fncnx4Up2rf5Ydx+0Q3DXvJfrL\nwl8b12/7RH5cWenZ184fGQvtS4bW9nMkfrMzme80oxtfKrTL0JVvzTSBOlnfspUt\n2+8kxwqkU/8kEs0JOrlD2kQkUJgqqYHcDVroygbSlYL3mDzhoG7owqRaSRR8iGFQ\nRlS65DJcdQKBgQDA60hluJEBoWYQGfVazR1IiFu5MZKwem/SCRa4hzyltepdcp6t\n9JYe2+VG2wjhJ2GEsLLECntoygESfzFChPhpSEikPHfDYAOkJ3mgF9Yr2cEi6ga+\ny6hLU2qkaFHVo1tuDwYcTgYf6Z2ogswlfPjr0exz93r5ltHZj95x5fiTjQKBgQCn\nPj5ck5qC79ClBb8Wozef27paQGPo++yW1y2Jq1Wqkgd1URvqSNLVW0BWK+I7VplS\n9pLqnXQ47xOfMu2YLmfaZuLeBPh+82Mr8MZAMbv806nJ/Gt6sLiCHV6g0xKs7P1e\nRpNlN0kwSIxS318+iTgyCSszAplojP2cQfdx1SpZnQKBgEVwl3UDN7MErxgrNywI\nPF4OXcS3pvwm5Q0Byhxdch/ucFmAwnPG/8O7L2KLeypGU82PXjMql7yf/lzkTVn8\nnnU2UoG9AH6kMkUVyqLe9S5O6YNNwvT3WB9tSHSrWJMwD5wuek3ZXF1uoCgP1Ilx\n9xG77EASRsjLdmaQDp2wg2Ze\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2qaz9@vtrade-1333d.iam.gserviceaccount.com",
    "client_id": "116389531473306926922",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2qaz9%40vtrade-1333d.iam.gserviceaccount.com"
    })
    try:
        firebase_admin.initialize_app(cred,{
            'databaseURL' : 'https://vtrade-1333d-default-rtdb.asia-southeast1.firebasedatabase.app/'

        })
    except(Exception ):
        print("catch called")
        pass

    ref = db.reference('/uid/currentuser')
    userid = ref.get()

    ll = db.reference('traders/'+userid+'/stockdetails')
    stocks = ll.get()

    portfolio = list(stocks.keys())

    from bs4 import BeautifulSoup as BS
    import requests as req
    news_dict={}
    for symbol in portfolio:
        url = f"https://www.businesstoday.in/topic/{symbol}"
        webpage = req.get(url)
        trav = BS(webpage.content, "html.parser")
        data = trav.find_all("div", class_ = "newimg")
        l = []
        if(len(data) == 0):
                continue
        else:
            for i in data:
                a = i.find("a")
                img=a.find("img")
                l.append([a.get("href"),a.get("title"),img.get("data-src")])
            if(len(l)>0):
                news_dict[symbol]=l
    print(news_dict)
    return(news_dict)


@views.route('/news', methods=['GET', 'POST'])
def news():
    x = getPortfolioNews()
    return render_template("news.html",data  = x, len = len(x))


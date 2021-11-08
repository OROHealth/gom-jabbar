FROM python:latest

RUN apt-get update

RUN mkdir /api

COPY . /api

WORKDIR /api

# RUN apt-get install wkhtmltopdf -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gunicorn uvicorn
RUN rm -f ../celerybeat.pid

RUN export GOOGLE_APPLICATION_CREDENTIALS="/api/google/sf-capitale-84a6e1a53c24.json"

EXPOSE 80

# CMD ["gunicorn", "-k", "eventlet", "-w", "8", "--threads=8", "--worker-class=gthread", "-b", "0.0.0.0:80", "run:app", "--log-level", "debug", "--reload", "--timeout", "320"]
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornH11Worker", "-w", "8", "--threads=8", "--worker-class=gthread", "-b", "0.0.0.0:80", "run:app", "--log-level", "debug", "--reload", "--timeout", "320"]
# CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "80", "--reload", "--workers", "4", "--use-colors", "--log-level", "debug"]
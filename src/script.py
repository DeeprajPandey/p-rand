import os.path
import json
from urllib.error import HTTPError
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/drive']

# The ID of a sample document.
DOCUMENT_ID = '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE'
TESTD_ID = '19kFE3Vo-s484ZzwyfyRULv9Pfqffs4Qjqj7oExC6nDI'


def main():
    """Shows basic usage of the Docs API.
    Prints the title of a sample document.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '../creds.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    requests = None
    if os.path.exists('requests.json'):
        with open('requests.json', 'r') as req:
            requests = json.load(req)
    if not requests:
        print('Invalid requests file.')
    else:
        with build('docs', 'v1', credentials=creds) as service:
            try:
                result = service.documents().batchUpdate(
                    documentId=TESTD_ID, body={'requests': requests}).execute()
                print(result)

                # Retrieve the documents contents from the Docs service.
                # request = service.documents().get(documentId=TESTD_ID)
                # document = request.execute()
                # print('The title of the document is: {}'.format(
                #     document.get('title')))

                # Print full response object
                # print(json.dumps(document, sort_keys=True, indent=4))
            except HTTPError as e:
                print('Error response status code: {0}\nreason: {1}', format(
                    e.status_code, e.error_details))


if __name__ == '__main__':
    main()

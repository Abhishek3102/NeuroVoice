from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as gen_ai
import os

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

gen_ai.configure(api_key=GOOGLE_API_KEY)
model = gen_ai.GenerativeModel('gemini-pro')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_prompt = data.get('user_prompt')

    if "chat_session" not in globals():
        global chat_session
        chat_session = model.start_chat(history=[])

    gemini_response = chat_session.send_message(user_prompt)
    
    chatbot_response = gemini_response.text.strip()

    return jsonify({"response": chatbot_response})

if __name__ == "__main__":
    app.run(debug=True)

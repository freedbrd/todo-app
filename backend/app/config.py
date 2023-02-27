import os


class Config:
    MONGO_URI = f"mongodb+srv://freedbrd:{os.environ['MONGODB_PASSWORD']}@cluster0.ojxvrdm.mongodb.net/todos?retryWrites=true&w=majority"

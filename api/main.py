import os

import mysql.connector
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
mongo_db = mongo_client[os.getenv("MONGO_DATABASE", "blog_db")]


def get_mysql_connection():
    return mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        host=os.getenv("MYSQL_HOST"),
        charset="utf8mb4",
        use_unicode=True,
    )


@app.get("/posts")
async def get_posts():
    cursor = mongo_db.posts.find({}, {"_id": 0}).sort("titre", 1)
    posts = await cursor.to_list(length=100)
    return {"posts": posts}


@app.get("/users")
async def get_users():
    conn = get_mysql_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            "SELECT id, prenom, nom, email FROM utilisateurs ORDER BY id"
        )
        records = cursor.fetchall()
        return {"users": records}
    finally:
        cursor.close()
        conn.close()

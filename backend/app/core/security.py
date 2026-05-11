from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# パスワードをハッシュ化してDBに保存
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# 入力されたパスワードとDBのパスワードを比較(ログイン時)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

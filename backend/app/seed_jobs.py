from app.db import SessionLocal
from app.models.job import Job

def seed_jobs():
  db = SessionLocal()

  jobs = [
    "会社員・管理職","公務員","医療・福祉","IT・技術","専門職","金融・不動産",
    "マスコミ・広告・芸能","教育・サービス","ファッション・美容","その他"
  ]

  if db.query(Job).first():
      db.close()
      return

  for name in jobs:
      db.add(Job(job_name=name))

      db.commit()
      db.close()

if __name__ == "__main__":
      seed_jobs()

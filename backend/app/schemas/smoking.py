from pydantic import BaseModel

class SmokingResponse(BaseModel):
  smoking_id:int
  smoking_name:str

  class Config:
      from_attributes = True

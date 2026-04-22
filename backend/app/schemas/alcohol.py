from pydantic import BaseModel

class AlcoholResponse(BaseModel):
  alcohol_id:int
  alcohol_name:str

  class Config:
      from_attributes = True

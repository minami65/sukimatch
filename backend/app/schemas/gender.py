from pydantic import BaseModel

class GenderResponse(BaseModel):
  gender_id:int
  gender_name:str

  class Config:
      from_attributes = True

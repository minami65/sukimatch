from pydantic import BaseModel

class IncomeResponse(BaseModel):
  income_id:int
  income_name:str

  class Config:
      from_attributes = True

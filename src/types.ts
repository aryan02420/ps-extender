// FIXME: missing companyID
interface getPBPOPUP {
  ProjectId: number
  Groupid: number
  Tags: string
  Tags2: string
  Coursespecial2: number
  Coursespecial1: number
  DomainId1: number
  DomainName1: string
  DomainId2: number
  DomainName2: string
  StationId: number
  PSTypeFor: number
  BatchIdFor: number
}

interface ViewPB {
  ProjectId: number
  TotalReqdStudents: number
  ProjectId1: number
  ProbBankId: null
  projectTitle: string
  CompanyId: number
  StationId: number
  PSType: number
  BatchId: number
  FacultyId: number
  PBDescription: string
  TotalReqdStudents1: number
  GeneralMinCGPA: string
  GeneralMaxCGPA: string
  CreateDate: string
  IsActive: boolean
  Degree: number
  PSTypeFor: number
  BatchIdFor: number
  SKills: string
  elective: string
  electivegrade: string
  Broad: string
  Filleddate: string
  Tags: string
  Filledby: string
  TotalProject: number
}

interface StationFacilitiesInfo {
  StationFacilitiesId: number
  Stipend: number
  FacultyId: number
  StipendForPG: number
  RemarkforAccommodation: string
  ContactDetailsForBoys: string
  ContactDetailsForGirls: string
  AccomAddressforBoys: string
  AccomAddressforGirls: string
  CompanyId: number
  StartTime: string
  TillTime: string
  Status: string
  Accomodation: string
  OnOffice: string
  ToOffice: string
  FieldDA: string
  Medical: string
  FieldTA: string
  Stationary: string
  SubsidizedLunch: string
  Travel: string
  Weekdays: string
  StationAddress: string
  OtherInfo: string
}

// TODO: complete this type
export interface PSError { }

export interface PSData {
  d: string
}

export type PSUrl =
  | 'http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBPOPUP'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewPB'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationFacilitiesInfo'

export type PSResponses<U extends PSUrl> =
  U extends 'http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBPOPUP' ? getPBPOPUP[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewPB' ? ViewPB[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationFacilitiesInfo' ? [] | [StationFacilitiesInfo] :
  never

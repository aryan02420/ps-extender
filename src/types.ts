interface getPBdetail {
  StationId: number
  Tags: string
  stipend: number
  AccomodationDesc: string
  stipendforpg: number
  Scholarship: number
  CompanyId: number
  TotalProject: number
  City: string
  CompanyName: string
  ProjectIndustryDomain: number
  IndustryDomain: string
}

interface getPBPOPUP {
  StationId: number
  CompanyId: number
  TotalProject: number
  BatchName: string
  BatchIdFor: number
  PSTypeFor: number
  Tags: string
  stipend: number
  Scholarship: number
  stipendforpg: number
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

interface ViewProbBankDisciplaine {
  Groupid: number,
  Tags: null | string,
  Tags2: null | string,
  Coursespecial2: number,
  Coursespecial1: number,
  DomainId1: null | number,
  DomainName1: null | string,
  DomainId2: null | number,
  DomainName2: null | string,
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

interface StationName {
  stationlocation: string
  web: string
  StationAddress: string
  CompanyAddress: string
}

interface selectgroupstudent {
  ProjectId: number
  Groupid: number
}

interface selectgroup {
  ProjectId: number,
  Groupid: number,
  Tags: string,
  Tags2: string,
  Coursespecial2: number,
  Coursespecial1: number,
  DomainId1: number,
  DomainName1: string,
  DomainId2: number,
  DomainName2: string,
  StationId: number,
  PSTypeFor: number,
  BatchIdFor: number,
}

interface ViewStudentStationPer {
  PreferenceNo: number
  StudentId: number
  Eligible: number
  seats: number
  Accommodation: string
  Location: string
  CompanyName: string
  StationId: number
  CompanyId: number
}

interface getdata {
  StudentID: number
  IdNumber: string
  FirstName: string
  LastName: string
  BitsEmailId: string
  CGPA: number
  Address: string
  Mobile: string
  LandlineNo: string
  PanCardDetails: string
  DateofBirth: string
  Course1: string
  Course2: string
  Specialization1: string
  Specialization2: string
  NameOfOrganizationPSI: string
}

export interface PSError {
  Message: string
  StackTrace: string
  ExceptionType: string
}

export interface PSData {
  d: string
}

export type PSUrl =
  | 'http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBdetail'
  | 'http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBPOPUP'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewPB'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewProbBankDisciplaine'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationFacilitiesInfo'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationName'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/selectgroupstudent'
  | 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/selectgroup'
  | 'http://psd.bits-pilani.ac.in/Student/NEWStudentDashboard.aspx/ViewStudentStationPer'
  | 'http://psd.bits-pilani.ac.in/Student/StudentBiodataDetails.aspx/getdata'

export type PSResponses<U extends PSUrl> =
  U extends 'http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBdetail' ? getPBdetail[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/ViewActiveStationProblemBankData.aspx/getPBPOPUP' ? [getPBPOPUP, ...getPBPOPUP[]] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewPB' ? ViewPB[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/ViewProbBankDisciplaine' ? ViewProbBankDisciplaine[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationFacilitiesInfo' ? [] | [StationFacilitiesInfo] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/StationName' ? [] | [StationName] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/selectgroupstudent' ? selectgroupstudent[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StationproblemBankDetails.aspx/selectgroup' ? selectgroup[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/NEWStudentDashboard.aspx/ViewStudentStationPer' ? ViewStudentStationPer[] :
  U extends 'http://psd.bits-pilani.ac.in/Student/StudentBiodataDetails.aspx/getdata' ? [getdata] :
  never

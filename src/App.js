// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import React Router components
import AddBook from './Pages/AddBook';
import DriverForm from './Pages/AddDriver';
import AddExamType from './Pages/AddExamType';
import AddExpensePage from './Pages/AddExpenses';
import AddFeesInvoice from './Pages/AddFeesInvoice';
import AddIncomePage from './Pages/AddIncome';
import StudentsMarksPage from './Pages/AddMarks';
import AddMeeting from './Pages/AddMeeting';
import AddMember from './Pages/AddMember';
import AddNewStaffPage from './Pages/AddNewStaff';
import AddNoticePage from './Pages/AddNotice';
import AddStaffForm from './Pages/AddStaff';
import AddTeacher from './Pages/AddTeacher';
import AddTopic from './Pages/AddTopic';
import AdminLogin from './Pages/AdminLogin';
import AdmissionQuery from './Pages/AdmissionQuery';
import GenerateAdmitCard from './Pages/AdmitCard';
import ApproveLeaveRequestPage from './Pages/ApprovalLeave';
import ApproveDepositTable from './Pages/ApproveDepositTable';
import AssignClassTeacherPage from './Pages/AssignClassTeacher';
import AssignmentList from './Pages/Assignment';
import AssignSubjectPage from './Pages/AssignSubject';
import AddAssignVehicle from './Pages/AssignVehicle';
import BankAccountPage from './Pages/BankAccountPage';
import BankPayment from './Pages/BankPayment';
import BlockedUserPage from './Pages/BlockedUser';
import BookCategories from './Pages/BookCategories';
import BookList from './Pages/BookList';
import CertificateTypePage from './Pages/Certificate';
import CertificatePage from './Pages/CertificatePage';
import CertificateSettings from './Pages/CertificateSetting';
import CertificateTemplatesPage from './Pages/CertificateTemplate';
import ChartOfAccountPage from './Pages/ChartOfAccount';
import ChatListPage from './Pages/ChatList';
import ClassListPage from './Pages/ClassList';
import ClassPage from './Pages/ClassPage';
import ClassRoomPage from './Pages/ClassRoom';
import ClassRoutineCreate from './Pages/ClassRoutine';
import ImageDisplay from './Pages/ComingSoon';
import ComplaintBook from './Pages/ComplaintBook';
import Complaints from './Pages/Complaints';
import ConditionalCertificatePage from './Pages/ConditionalCertificate';
import ConnectionRequestsPage from './Pages/ConnectionRequest';
import ContentList from './Pages/ContentList';
import { default as ContentTypePage, default as ContentTypePg } from './Pages/ContentTypePg';
import Dashboard from './Pages/Dashboard';
import DeleteStudentRecord from './Pages/DeleteStudentRecord';
import DepartmentPage from './Pages/DepartmentPage';
import DesignationPage from './Pages/DesignationPage';
import DisabledStudents from './Pages/DisabledStudent';
import DriverListPage from './Pages/DriverList';
import EmailSMSLogPage from './Pages/EmailSMSLog';
import EventListPage from './Pages/EventList';
import ExamAttendance from './Pages/ExamAttendance';
import ExamSetup from './Pages/ExamSetup';
import ExamSchedule from './Pages/ExamShedule';
import ExamScheduleList from './Pages/ExamSheduleList';
import ExamTypeListPage from './Pages/ExamTypeTable';
import FeeDetails from './Pages/FeeDetails';
import FeesManagement from './Pages/Fees';
import FeesInvoiceBulkPrint from './Pages/FeesBulkPrint';
import FeesGroup from './Pages/FeesGroup';
import FeesInvoice from './Pages/FeesInvoice';
import FeesInvoiceSettings from './Pages/FeesInvoiceSetting';
import FeesType from './Pages/FeesType';
import GenerateCertificate from './Pages/GenerateCertificate';
import GenerateIdCard from './Pages/GenerateIdCard';
import GeneratePayrollPage from './Pages/GeneratePayroll';
import Guide from "./Pages/Guide";
import HolidayForm from './Pages/HolidayForm';
import HolidayPage from './Pages/Holidays';
import AddHomework from './Pages/Homework';
import HomeworkList from './Pages/HomeworkList';
import IssueBooks from './Pages/IssueBook';
import IssuedBookList from './Pages/IssuedBookList';
import LeaveDefinePage from './Pages/LeaveDefine';
import Leaves from './Pages/LeaveList';
import LeaveTypePage from './Pages/LeaveType';
import AddLesson from './Pages/Lesson';
import LessonList from './Pages/LessonList';
import LessonPlanOverview from './Pages/LessonPlanOverview';
import LessonPlanCreate from './Pages/LessoonPlan';
import ManageStudent from './Pages/ManagesStudent';
import MarksRegister from './Pages/MarkRegister';
import MarksGrade from './Pages/MarksGrade';
import MarksheetReport from './Pages/MarksheetReport';
import MarksList from './Pages/MarksList';
import MeetingPage from './Pages/MeetingTable';
import MultiClassStudent from './Pages/MultiClassStudent';
import NoticeBoardPage from './Pages/NoticeBoard';
import OptionalSubject from './Pages/OptionalSubject';
import OtherDownloadsList from './Pages/OtherDownloads';
import Parents from './Pages/ParentList';
import PayrollBulkPrint from './Pages/PayrollBulkPrint';
import PendingLeaveRequestPage from './Pages/PendingLeave';
import PendingTable from './Pages/PendingTable';
import PhoneCallLog from './Pages/PhoneCallLog';
import PostalDispatch from './Pages/PostalDispatch';
import PostalReceive from './Pages/PostalReceive';
import ProfitLossPage from './Pages/ProfitLossPage';
import RefundRequestTable from './Pages/RefundRequest';
import RejectDepositTable from './Pages/RejectDeposit';
import RoutineList from './Pages/RoutineList';
import GenerateSeatPlan from './Pages/SeatPlan';
import SectionListPage from './Pages/SectionList';
import SectionPage from './Pages/SectionPage';
import SendEmailSMSPage from './Pages/SendEmail';
import SendMarksBySms from './Pages/SendMarksBySMS';
import Setting from './Pages/Setting';
import SharedContentPage from './Pages/SharedContent';
import Sidebar from './Pages/Sidebar';
import StaffAttendancePage from './Pages/StaffAttendance';
import StaffCertificatePage from './Pages/StaffCertificate';
import { default as StaffList, default as StaffListPage } from './Pages/StaffList';
import Staffs from './Pages/Staffs';
import StudentAdmission from './Pages/StudentAdmission';
import StudentAttendance from './Pages/StudentAttendance';
import StudentAttendanceReportPage from './Pages/StudentAttendanceReport';
import StudentCategory from './Pages/StudentCategory';
import StudentCertificatePage from './Pages/StudentCertificate';
import StudentExport from './Pages/StudentExport';
import StudentGroup from './Pages/StudentGroup';
import StudentList from './Pages/StudentList';
import StudentPromote from './Pages/StudentPromote';
import StudentSubjectReportPage from './Pages/StudentSubjectReport';
import Subject from './Pages/Subject';
import SubjectListPage from './Pages/SubjectList';
import SubjectPage from './Pages/SubjectPage';
import SubjectWiseAttendance from './Pages/SubjectWiseAttendance';
import SyllabusList from './Pages/Syllabus';
import Teacher from './Pages/Teacher';
import TeacherList from './Pages/TeacherList';
import TopicList from './Pages/TopicList';
import TopicOverview from './Pages/TopicOverview';
import TransportRouteListPage from './Pages/TransportRouteList';
import TransportRoutePage from './Pages/TransportRoutePage';
import UnassignedStudentList from './Pages/UnassignedStudent';
import UploadContent from './Pages/UpdateContent';
import VehiclePage from './Pages/VehicalPage';
import VehicleListPage from './Pages/VehicleList';
import VideoPage from './Pages/VideoPage';
import VisitorBook from './Pages/VisitorBook';
import CommunicationForm from './Parents/ComunicateWithTeacher';
import MyChildApplyLeave from './Parents/MyChildApplyLeave';
import MyChildAttendance from './Parents/MyChildAttendance';
import MyChildClassRoutinePage from './Parents/MyChildClassRoutinePage';
import MyChildExamSchedule from './Parents/MyChildExamSchedule';
import MyChildLessonPlanOverviewStudent from './Parents/MyChildLessonOverview';
import MyChildLessonPlan from './Parents/MyChildLessonPlan';
import MyChildPendingLeaveRequest from './Parents/MyChildPendingLeaveRequest';
import MyChildProfile from './Parents/MyChildProfile';
import MyChildComplaintPage from './Parents/MyChildrenComplaint';
import MyChildrenFees from './Parents/MyChildrenFees';
import MyChildMarksPage from './Parents/MyChildrenMarks';
import MyChildStudentHomeworkList from './Parents/MyChildStudentHomeworkList';
import ParentDashboard from './Parents/ParentDashboard';
import ParentHolidayPage from './Parents/ParentHolidaysPage';
import ParentLogin from './Parents/ParentLogin';
import ParentNoticeBoard from './Parents/ParentNoticeBoard';
import ParentSidebar from './Parents/ParentSidebar';
import ParentStudentBookListPage from './Parents/ParentStudentBookListPage';
import ParentSubjectDetails from './Parents/ParentSubjectDetails';
import ParentTeachersList from './Parents/ParentTeachersList';
import ParentTransportPage from './Parents/ParentTransportPage';
import StudnetSidebar from './Sidebar';
import StudentAssignmentList from './Student/AssignmentList';
import StudentBookListPage from './Student/BookList';
import DailyRoutinePage from './Student/ClassRoutine';
import DormitoryPage from './Student/Dometory';
import ExamRoutinePage from './Student/ExamRoutine';
import LessonPlanPage from './Student/LessonPlan';
import LessonPlanOverviewStudent from './Student/LessonPreview';
import StudentLogin from './Student/Login';
import ComplaintPage from './Student/MyComplaintPage';
import NoticeBoard from './Student/NoticeBoard';
import OnlineExamDetails from './Student/OnlineExam';
import OnlineExamResult from './Student/OnlineExamResult';
import PendingLeaveRequest from './Student/PendingLeaveRequest';
import StudentDetailsPage from './Student/Profile';
import ResultPage from './Student/Result';
import StudentAttendanceList from './Student/StudentAttendance';
import StudentDashboard from './Student/StudentDashboard';
import StudentFees from './Student/StudentFees';
import StudentHolidayPage from './Student/StudentHolidaysPage';
import StudentHomeworkList from './Student/StudentHomeworkList';
import TransportPage from './Student/StudentTransport';
import SubjectDetails from './Student/SubjectDetails';
import StudentSyllabusList from './Student/SyllabusList';
import TeachersList from './Student/TeacherList';
import AddHomeworkByTeacher from './Teacher/AssignHomework';
import TeacherClassRoutinePage from './Teacher/classRoutine';
import TeacherComingSoon from './Teacher/comingsoon';
import TeacherHomework from './Teacher/HomeworkList';
import TeacherMeetingPage from './Teacher/Meetings';
import NoticeBoardForTeacher from './Teacher/NoticeBoard';
import TeacherStudentsPage from './Teacher/StudentList';
import TeacherMarks from './Teacher/StudentMarks';
import TeacherAttendance from './Teacher/TeacherAttendance';
import TeacherCommunication from './Teacher/TeacherCommunication';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherExamSchedulePage from './Teacher/TeacherExamSchedule';
import TeacherHolidayPage from './Teacher/TeacherHolidayPage';
import TeacherLeavePage from './Teacher/TeacherLeave';
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherSidebar from './Teacher/TeacherSidebar';
import TeacherSubjects from './Teacher/TeacherSubjects';
import StudentsMarksPage from './Pages/AddMarks';
import Complaints from './Pages/Complaints';
import ComplaintPage from './Student/MyComplaintPage';
import MyChildComplaintPage from './Parents/MyChildrenComplaint';
import AddMeeting from './Pages/AddMeeting';
import MeetingPage from './Pages/MeetingTable';
import TeacherMeetingPage from './Teacher/Meetings';
function App() {
  return (
    <Router> {/* Wrap everything in Router to enable routing */}        
        <div>
          <Routes>
            {/* Define the route for the dashboard */}
            <Route path="/Admin-dashboard" element={<Dashboard />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/student-sidebar" element={<StudnetSidebar />} />
            <Route path="/query" element={<AdmissionQuery/>} />
            <Route path="/visitor" element={<VisitorBook/>} />
            <Route path="/complaint" element={<ComplaintBook/>} />
            <Route path="/postal" element={<PostalReceive/>} />
            <Route path="/postalDispatch" element={<PostalDispatch/>} />
            <Route path="/calllog" element={<PhoneCallLog/>} />
            <Route path="/stuList" element={<StudentList/>} />
            <Route path="/teacherList" element={<TeacherList/>} />
            <Route path="/certificate" element={<CertificatePage/>} />
            <Route path="/generate-certificate" element={<GenerateCertificate/>} />
            <Route path="/generate-idcard" element={<GenerateIdCard/>} />
            <Route path="/optional-subject" element={<OptionalSubject/>} />
            <Route path="/section" element={<SectionPage/>} />
            <Route path="/sections" element={<SectionListPage/>} />
            <Route path="/class" element={<ClassPage/>} />
            <Route path="/classlist" element={<ClassListPage/>} />
            <Route path="/subject" element={<SubjectPage/>} />
            <Route path="/subjectlist" element={<SubjectListPage/>} />
            <Route path="/assign-teacher" element={<AssignClassTeacherPage/>} />
            <Route path="/assign-subject" element={<AssignSubjectPage/>} />
            <Route path="/classroom" element={<ClassRoomPage/>} />
            <Route path="/classroutine" element={<ClassRoutineCreate/>} />
            <Route path="/classroutinelist" element={<RoutineList/>} />
            <Route path="/updatecontent" element={<UploadContent/>} />
            <Route path="/assignment" element={<AssignmentList/>} />
            <Route path="/syllabus" element={<SyllabusList/>} />
            <Route path="/downloads" element={<OtherDownloadsList/>} />
            <Route path="/lesson" element={<AddLesson/>} />
            <Route path="/lessonlist" element={<LessonList/>} />
            <Route path="/topic" element={<AddTopic/>} />
            <Route path="/topiclist" element={<TopicList/>} />
            <Route path="/topicoverview" element={<TopicOverview/>} />
            <Route path="/lessonplan" element={<LessonPlanCreate/>} />
            <Route path="/lessonplanoverview" element={<LessonPlanOverview/>} />
            <Route path="/payroll" element={<PayrollBulkPrint/>} />
            <Route path="/feesinvoice" element={<FeesInvoiceBulkPrint/>} />
            <Route path="/feesinvoicesetting" element={<FeesInvoiceSettings/>} />
            <Route path="/content" element={<ContentTypePage/>} />
            <Route path="/contentlist" element={<ContentList/>} />
            <Route path="/contenttopic" element={<ContentTypePg/>} />
            <Route path="/sharedcontent" element={<SharedContentPage/>} />
            <Route path="/video" element={<VideoPage/>} />
            <Route path="/certificatetype" element={<CertificateTypePage/>} />
            <Route path="/certificatetemplate" element={<CertificateTemplatesPage/>} />
            <Route path="/studentcertificate" element={<StudentCertificatePage/>} />
            <Route path="/staffcertificate" element={<StaffCertificatePage/>} />
            <Route path="/conditionalcertificate" element={<ConditionalCertificatePage/>} />
            <Route path="/certificatesetting" element={<CertificateSettings/>} />
            <Route path="/studentcat" element={<StudentCategory/>} />
            <Route path="/studentadmission" element={<StudentAdmission/>} />
            <Route path="/managestudent" element={<ManageStudent/>} />
            <Route path="/multistudent" element={<MultiClassStudent/>} />
            <Route path="/deletestudent" element={<DeleteStudentRecord/>} />
            <Route path="/unassignedstudent" element={<UnassignedStudentList/>} />
            <Route path="/studentattendance" element={<StudentAttendance/>} />
            <Route path="/studentgrp" element={<StudentGroup/>} />
            <Route path="/studentpromote" element={<StudentPromote/>} /> 
            <Route path="/disabledstudent" element={<DisabledStudents/>} />
            <Route path="/subjectwiseatten" element={<SubjectWiseAttendance/>} />
            <Route path="/studentexport" element={<StudentExport/>} />
            <Route path="/feesgroup" element={<FeesGroup/>} />
            <Route path="/feestype" element={<FeesType/>} />
            <Route path="/feesinvo" element={<FeesInvoice/>} />
            <Route path="/addfeesinvoice" element={<AddFeesInvoice/>} />
            <Route path="/bankpayment" element={<BankPayment/>} />
            <Route path="/homework" element={<AddHomework/>} />
            <Route path="/homeworklist" element={<HomeworkList/>} />
            <Route path="/addbook" element={<AddBook/>} />
            <Route path="/booklist" element={<BookList/>} />
            <Route path="/bookcategories" element={<BookCategories/>} />
            <Route path="/addmember" element={<AddMember/>} />
            <Route path="/issuebook" element={<IssueBooks/>} />
            <Route path="/issuebooklist" element={<IssuedBookList/>} />
            <Route path="/subjectpage" element={<Subject/>} />
            <Route path="/transport" element={<TransportRoutePage/>} />
            <Route path="/transportlist" element={<TransportRouteListPage/>} />
            <Route path="/vehicle" element={<VehiclePage/>} />
            <Route path="/vehiclelist" element={<VehicleListPage/>} />
            <Route path="/assignvehicle" element={<AddAssignVehicle/>} />
            <Route path="/addexam" element={<AddExamType/>} />
            <Route path="/examsetup" element={<ExamSetup/>} />
            <Route path="/examshedule" element={<ExamSchedule/>} />
            <Route path="/examshedulelist" element={<ExamScheduleList/>} />
            <Route path="/examattendance" element={<ExamAttendance/>} />
            <Route path="/markregister" element={<MarksRegister/>} />
            <Route path="/marksgrade" element={<MarksGrade/>} />
            <Route path="/sendmarksbysms" element={<SendMarksBySms/>} />
            <Route path="/marksheetreport" element={<MarksheetReport/>} />
            <Route path="/admitcard" element={<GenerateAdmitCard/>} />
            <Route path="/seatplan" element={<GenerateSeatPlan/>} />
            <Route path="/designation" element={<DesignationPage/>} />
            <Route path="/department" element={<DepartmentPage/>} />
            <Route path="/addnewstaff" element={<AddNewStaffPage/>} />
            <Route path="/stafflist" element={<StaffListPage/>} />
            <Route path="/parentlist" element={<Parents/>} />
            <Route path="/staffattendance" element={<StaffAttendancePage/>} />
            <Route path="/generatepayroll" element={<GeneratePayrollPage/>} />
            <Route path="/approvalleave" element={<ApproveLeaveRequestPage/>} />
            <Route path="/pendingleave" element={<PendingLeaveRequestPage/>} />
            <Route path="/leavedefine" element={<LeaveDefinePage/>} />
            <Route path="/leavetype" element={<LeaveTypePage/>} />
            <Route path="/pending" element={<PendingTable/>} />
            <Route path="/approval" element={<ApproveDepositTable/>} />
            <Route path="/reject" element={<RejectDepositTable/>} />
            <Route path="/refund" element={<RefundRequestTable/>} />
            <Route path="/add-marks" element={<StudentsMarksPage/>} />
            <Route path="/profitloss" element={<ProfitLossPage/>} />
            <Route path="/addincome" element={<AddIncomePage/>} />
            <Route path="/addexpenses" element={<AddExpensePage/>} />
            <Route path="/chartofaccount" element={<ChartOfAccountPage/>} />
            <Route path="/bankaccount" element={<BankAccountPage/>} />
            <Route path="/chat" element={<ChatListPage/>} />
            <Route path="/connection" element={<ConnectionRequestsPage/>} />
            <Route path="/blockeduser" element={<BlockedUserPage/>} />
            <Route path="/noticeboard" element={<NoticeBoardPage/>} />
            <Route path="/addnotice" element={<AddNoticePage/>} />
            <Route path="/sendemail" element={<SendEmailSMSPage/>} />
            <Route path="/emaillog" element={<EmailSMSLogPage/>} />
            <Route path="/eventlist" element={<EventListPage/>} />
            <Route path="/studenttendance" element={<StudentAttendanceReportPage/>} />
            <Route path="/studentsubject" element={<StudentSubjectReportPage/>} />
            <Route path="/student-dashboard" element={<StudentDashboard/>} />
            <Route path="/student-profile" element={<StudentDetailsPage/>} />
            <Route path="/class-routine" element={<DailyRoutinePage/>} />
            <Route path="/student-lessonplan" element={<LessonPlanPage/>} />
            <Route path="/student-lessonplan-overview" element={<LessonPlanOverviewStudent/>} />
            <Route path="/student-homework" element={<StudentHomeworkList/>} />
            <Route path="/student-assignment" element={<StudentAssignmentList/>} />
            <Route path="/student-syllabus" element={<StudentSyllabusList/>} />
            <Route path="/student-attendance" element={<StudentAttendanceList/>} />
            <Route path="/leaves" element={<Leaves/>} />
            <Route path="/pending-leave" element={<PendingLeaveRequest/>} />
            <Route path="/student-result" element={<ResultPage/>} />
            <Route path="/student-exam-routine" element={<ExamRoutinePage/>} />
            <Route path="/student-notice-board" element={<NoticeBoard/>} />
            <Route path="/student-subject-details" element={<SubjectDetails/>} />
            <Route path="/student-online-exam" element={<OnlineExamDetails/>} />
            <Route path="/student-online-exam-result" element={<OnlineExamResult/>} />
            <Route path="/student-teacher-list" element={<TeachersList/>} />
            <Route path="/student-transport" element={<TransportPage/>} />
            <Route path="/student-booklist" element={<StudentBookListPage/>} />
            <Route path="/student-dormitory" element={<DormitoryPage/>} />
            <Route path="/student-fees" element={<StudentFees/>} />
            <Route path="/student-holidays" element={<StudentHolidayPage/>} />
            <Route path="/teacher" element={<Teacher/>} />
            <Route path="/sidebar" element={<Sidebar/>} />
            <Route path='/user-guide' element={<UserGuide/>}/>
            <Route path="/student-login" element={<StudentLogin/>} />
            <Route path="/marks" element={<MarksList/>} />
            <Route path="/staff" element={<AddStaffForm/>} />
            <Route path="/staffs" element={<Staffs/>} />
            <Route path="/staffList" element={<StaffList/>} />
            <Route path="/settings" element={<Setting/>} />
            <Route path="/coming-soon" element={<ImageDisplay/>} />
            <Route path="/fees" element={<FeesManagement/>} />
            <Route path="/fees-details" element={<FeeDetails/>} />
            <Route path="/add-holiday" element={<HolidayForm/>} />
            <Route path="/holidays" element={<HolidayPage/>} />
            <Route path="/add-teacher" element={<AddTeacher/>} />
            <Route path="/add-driver" element={<DriverForm/>} />
            <Route path="/driverlist" element={<DriverListPage/>} />
            <Route path="/examtypelist" element={<ExamTypeListPage/>} />
            <Route path="/complaintlist" element={<Complaints/>} />
            <Route path="/add-meeting" element={<AddMeeting/>} />
            <Route path="/meetings" element={<MeetingPage/>} />
            <Route path="/student-complaint" element={<ComplaintPage/>} />


















           {/* Parents Sections */}  
           <Route path="/parent-sidebar" element={<ParentSidebar/>} />
           <Route path="/parent-dashboard" element={<ParentDashboard/>} />
           <Route path="/mychild-profile" element={<MyChildProfile/>} />
           <Route path="/mychild-fees" element={<MyChildrenFees/>} />
           <Route path="/mychild-lesson-plan" element={<MyChildLessonPlan/>} />
           <Route path="/mychild-lesson-plan-overview" element={<MyChildLessonPlanOverviewStudent/>} />
           <Route path="/mychild-homework" element={<MyChildStudentHomeworkList/>} />
           <Route path="/mychild-routine" element={<MyChildClassRoutinePage/>} />
           <Route path="/mychild-attendance" element={<MyChildAttendance/>} />
           <Route path="/mychild-exam-schedule" element={<MyChildExamSchedule/>} />
           <Route path="/mychild-leave-apply" element={<MyChildApplyLeave/>} />
           <Route path="/mychild-pendingleave" element={<MyChildPendingLeaveRequest/>} />
           <Route path="/parent-noticeboard" element={<ParentNoticeBoard/>} />
           <Route path="/parent-subjects" element={<ParentSubjectDetails/>} />
           <Route path="/parent-teachers" element={<ParentTeachersList/>} />
           <Route path="/parent-booklist" element={<ParentStudentBookListPage/>} />
           <Route path="/parent-transport" element={<ParentTransportPage/>} />
           <Route path="/mychild-exam-schedules" element={<MyChildMarksPage/>} />
           <Route path="/parent-login" element={<ParentLogin/>} />
           <Route path="/ask-queries" element={<CommunicationForm/>} />
           <Route path="/children-holidays" element={<ParentHolidayPage/>} />
           <Route path="/mychild-complaint" element={<MyChildComplaintPage/>} />






          {/* Parents Sections */}   
          <Route path="/teacher-sidebar" element={<TeacherSidebar/>} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard/>} />
          <Route path="/teacher-attendance" element={<TeacherAttendance/>} />
          <Route path="/teacher-homework" element={<AddHomeworkByTeacher/>} />
          <Route path="/teacher-homeworklist" element={<TeacherHomework/>} />
          <Route path="/teacher-exam-schedule" element={<TeacherExamSchedulePage/>} />
          <Route path="/teacher-classroutine" element={<TeacherClassRoutinePage/>} />
          <Route path="/teacher-noticeboard" element={<NoticeBoardForTeacher/>} />
          <Route path="/teacher-leave" element={<TeacherLeavePage/>} />
          <Route path="/teacher-students" element={<TeacherStudentsPage/>} />
          <Route path="/teacher-marks" element={<TeacherMarks/>} />
          <Route path="/teacher-login" element={<TeacherLogin/>} />
          <Route path="/teacher-coming-soon" element={<TeacherComingSoon/>} />
          <Route path="/teacher-queries" element={<TeacherCommunication/>} />
          <Route path="/teacher-holidays" element={<TeacherHolidayPage/>} />
          <Route path="/teacher-subjects" element={<TeacherSubjects/>} />
          <Route path="/generateid" element={<GenerateId/>} />
          <Route path="/generateid/room/:roomId" element={<RoomsVc/>} />
          <Route path="/teacher-meetings" element={<TeacherMeetingPage/>} />
















 




















            


































































































































            {/* You can add more routes here as needed */}
          </Routes>
        </div>
    </Router>
  );
}

export default App;

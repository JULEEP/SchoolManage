// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import Sidebar from './Pages/Sidebar';
import Dashboard from './Pages/Dashboard';
import AdmissionQuery from './Pages/AdmissionQuery';
import VisitorBook from './Pages/VisitorBook';
import ComplaintBook from './Pages/ComplaintBook';
import PostalReceive from './Pages/PostalReceive';
import PostalDispatch from './Pages/PostalDispatch';
import PhoneCallLog from './Pages/PhoneCallLog';
import StudentList from './Pages/StudentList';
import CertificatePage from './Pages/CertificatePage';
import GenerateCertificate from './Pages/GenerateCertificate';
import GenerateIdCard from './Pages/GenerateIdCard';
import OptionalSubject from './Pages/OptionalSubject';
import SectionPage from './Pages/SectionPage';
import ClassPage from './Pages/ClassPage';
import SubjectPage from './Pages/SubjectPage';
import AssignClassTeacherPage from './Pages/AssignClassTeacher';
import AssignSubjectPage from './Pages/AssignSubject';
import ClassRoomPage from './Pages/ClassRoom';
import ClassRoutineCreate from './Pages/ClassRoutine';
import UploadContent from './Pages/UpdateContent';
import AssignmentList from './Pages/Assignment';
import SyllabusList from './Pages/Syllabus';
import OtherDownloadsList from './Pages/OtherDownloads';
import AddLesson from './Pages/Lesson';
import AddTopic from './Pages/AddTopic';
import TopicOverview from './Pages/TopicOverview';
import LessonPlanCreate from './Pages/LessoonPlan';
import LessonPlanOverview from './Pages/LessonPlanOverview';
import PayrollBulkPrint from './Pages/PayrollBulkPrint';
import FeesInvoiceBulkPrint from './Pages/FeesBulkPrint';
import FeesInvoiceSettings from './Pages/FeesInvoiceSetting';
import ContentTypePage from './Pages/ContentTypePg';
import ContentTypePg from './Pages/ContentTypePg';
import SharedContentPage from './Pages/SharedContent';
import VideoPage from './Pages/VideoPage';
import CertificateTypePage from './Pages/Certificate';
import CertificateTemplatesPage from './Pages/CertificateTemplate';
import StudentCertificatePage from './Pages/StudentCertificate';
import StaffCertificatePage from './Pages/StaffCertificate';
import ConditionalCertificatePage from './Pages/ConditionalCertificate';
import CertificateSettings from './Pages/CertificateSetting';
import StudentCategory from './Pages/StudentCategory';
import StudentAdmission from './Pages/StudentAdmission';
import ManageStudent from './Pages/ManagesStudent';
import MultiClassStudent from './Pages/MultiClassStudent';
import DeleteStudentRecord from './Pages/DeleteStudentRecord';
import UnassignedStudentList from './Pages/UnassignedStudent';
import StudentAttendance from './Pages/StudentAttendance';
import StudentGroup from './Pages/StudentGroup';
import StudentPromote from './Pages/StudentPromote';
import DisabledStudents from './Pages/DisabledStudent';
import SubjectWiseAttendance from './Pages/SubjectWiseAttendance';
import StudentExport from './Pages/StudentExport';
import FeesGroup from './Pages/FeesGroup';
import FeesType from './Pages/FeesType';
import FeesInvoice from './Pages/FeesInvoice';
import AddFeesInvoice from './Pages/AddFeesInvoice';
import BankPayment from './Pages/BankPayment';
import AddHomework from './Pages/Homework';
import HomeworkList from './Pages/HomeworkList';
import AddBook from './Pages/AddBook';
import BookList from './Pages/BookList';
import BookCategories from './Pages/BookCategories';
import AddMember from './Pages/AddMember';
import IssueBooks from './Pages/IssueBook';
import IssuedBookList from './Pages/IssuedBookList';
import Subject from './Pages/Subject';
import TransportRoutePage from './Pages/TransportRoutePage';
import VehiclePage from './Pages/VehicalPage';
import AddAssignVehicle from './Pages/AssignVehicle';
import AddExamType from './Pages/AddExamType';
import ExamSetup from './Pages/ExamSetup';
import ExamSchedule from './Pages/ExamShedule';
import ExamAttendance from './Pages/ExamAttendance';
import MarksRegister from './Pages/MarkRegister';
import MarksGrade from './Pages/MarksGrade';
import SendMarksBySms from './Pages/SendMarksBySMS';
import MarksheetReport from './Pages/MarksheetReport';
import GenerateAdmitCard from './Pages/AdmitCard';
import GenerateSeatPlan from './Pages/SeatPlan';
import DesignationPage from './Pages/DesignationPage';
import DepartmentPage from './Pages/DepartmentPage';
import AddNewStaffPage from './Pages/AddNewStaff';
import StaffListPage from './Pages/StaffList';
import StaffAttendancePage from './Pages/StaffAttendance';
import GeneratePayrollPage from './Pages/GeneratePayroll';
import ApproveLeaveRequestPage from './Pages/ApprovalLeave';
import PendingLeaveRequestPage from './Pages/PendingLeave';
import LeaveDefinePage from './Pages/LeaveDefine';
import LeaveTypePage from './Pages/LeaveType';
import PendingTable from './Pages/PendingTable';
import ApproveDepositTable from './Pages/ApproveDepositTable';
import RejectDepositTable from './Pages/RejectDeposit';
import RefundRequestTable from './Pages/RefundRequest';
import ProfitLossPage from './Pages/ProfitLossPage';
import AddIncomePage from './Pages/AddIncome';
import AddExpensePage from './Pages/AddExpenses';
import ChartOfAccountPage from './Pages/ChartOfAccount';
import BankAccountPage from './Pages/BankAccountPage';
import ChatListPage from './Pages/ChatList';
import ConnectionRequestsPage from './Pages/ConnectionRequest';
import BlockedUserPage from './Pages/BlockedUser';
import NoticeBoardPage from './Pages/NoticeBoard';
import AddNoticePage from './Pages/AddNotice';
import SendEmailSMSPage from './Pages/SendEmail';
import EmailSMSLogPage from './Pages/EmailSMSLog';
import EventListPage from './Pages/EventList';
import StudentAttendanceReportPage from './Pages/StudentAttendanceReport';
import StudentSubjectReportPage from './Pages/StudentSubjectReport';
import StudentDashboard from './Student/StudentDashboard';
import StudentDetailsPage from './Student/Profile';
import ClassRoutinePage from './Student/ClassRoutine';
import LessonPlanPage from './Student/LessonPlan';
import LessonPlanOverviewStudent from './Student/LessonPreview';
import StudentHomeworkList from './Student/StudentHomeworkList';
import StudentAssignmentList from './Student/AssignmentList';
import StudentSyllabusList from './Student/SyllabusList';
import StudentAttendanceList from './Student/StudentAttendance';
import ApplyLeave from './Student/ApplyLeave';
import PendingLeaveRequest from './Student/PendingLeaveRequest';
import ResultPage from './Student/Result';
import ExamRoutinePage from './Student/ExamRoutine';
import NoticeBoard from './Student/NoticeBoard';
import SubjectDetails from './Student/SubjectDetails';
import OnlineExamDetails from './Student/OnlineExam';
import OnlineExamResult from './Student/OnlineExamResult';
import TeachersList from './Student/TeacherList';
import TransportPage from './Student/StudentTransport';
import StudentBookListPage from './Student/BookList';
import DormitoryPage from './Student/Dometory';
import StudnetSidebar from './Sidebar';
import ParentSidebar from './Parents/ParentSidebar';
import ParentDashboard from './Parents/ParentDashboard';
import MyChildProfile from './Parents/MyChildProfile';
import MyChildrenFees from './Parents/MyChildrenFees';
import MyChildLessonPlan from './Parents/MyChildLessonPlan';
import MyChildLessonPlanOverviewStudent from './Parents/MyChildLessonOverview';
import MyChildStudentHomeworkList from './Parents/MyChildStudentHomeworkList';
import MyChildClassRoutinePage from './Parents/MyChildClassRoutinePage';
import MyChildAttendance from './Parents/MyChildAttendance';
import MyChildExamSchedule from './Parents/MyChildExamSchedule';
import MyChildApplyLeave from './Parents/MyChildApplyLeave';
import MyChildPendingLeaveRequest from './Parents/MyChildPendingLeaveRequest';
import ParentNoticeBoard from './Parents/ParentNoticeBoard';
import ParentSubjectDetails from './Parents/ParentSubjectDetails';
import ParentTeachersList from './Parents/ParentTeachersList';
import ParentStudentBookListPage from './Parents/ParentStudentBookListPage';
import ParentTransportPage from './Parents/ParentTransportPage';
import MyChildMarksPage from './Parents/MyChildrenMarks';
import TeacherSidebar from './Teacher/TeacherSidebar';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherAttendance from './Teacher/TeacherAttendance';
import AddHomeworkByTeacher from './Teacher/AssignHomework';
import TeacherHomework from './Teacher/HomeworkList';
import TeacherExamSchedulePage from './Teacher/TeacherExamSchedule';
import TeacherClassRoutinePage from './Teacher/classRoutine';
import NoticeBoardForTeacher from './Teacher/NoticeBoard';
import TeacherLeavePage from './Teacher/TeacherLeave';
import TeacherStudentsPage from './Teacher/StudentList';
import Teacher from './Pages/Teacher';
import TeacherMarks from './Teacher/StudentMarks';
import DailyRoutinePage from './Student/ClassRoutine';
import StudentLogin from './Student/Login';
import TeacherLogin from './Teacher/TeacherLogin';
import ParentLogin from './Parents/ParentLogin';
import AdminLogin from './Pages/AdminLogin';
import TeacherList from './Pages/TeacherList';
import MarksList from './Pages/MarksList'
import AddStaffForm from './Pages/AddStaff';
import StaffList from './Pages/StaffList';
import Setting from './Pages/Setting';
import ImageDisplay from './Pages/ComingSoon';
import TeacherComingSoon from './Teacher/comingsoon';
import FeesManagement from './Pages/Fees'
import FeeDetails from './Pages/FeeDetails';
import StudentFees from './Student/StudentFees';
import CommunicationForm from './Parents/ComunicateWithTeacher';
import TeacherCommunication from './Teacher/TeacherCommunication';
import HolidayPage from './Pages/Holidays';
import TeacherHolidayPage from './Teacher/TeacherHolidayPage';
import StudentHolidayPage from './Student/StudentHolidaysPage';
import ParentHolidayPage from './Parents/ParentHolidaysPage';
import AddTeacher from './Pages/AddTeacher';
import HolidayForm from './Pages/HolidayForm';
import Staffs from './Pages/Staffs';
import SectionListPage from './Pages/SectionList';
import ClassListPage from './Pages/ClassList';
import SubjectListPage from './Pages/SubjectList';
import RoutineList from './Pages/RoutineList';
import ContentList from './Pages/ContentList';
import LessonList from './Pages/LessonList';
import TopicList from './Pages/TopicList';
import TransportRouteListPage from './Pages/TransportRouteList';
import VehicleListPage from './Pages/VehicleList';
import ExamTypeList from './Pages/ExamTypeList';
import ExamScheduleList from './Pages/ExamSheduleList';
import Parents from './Pages/ParentList';
import DriverForm from './Pages/AddDriver';
import DriverListPage from './Pages/DriverList';
import ExamTypeListPage from './Pages/ExamTypeTable';
import Leaves from './Pages/LeaveList';
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
          <Route path="/teacher-meetings" element={<TeacherMeetingPage/>} />
















 




















            


































































































































            {/* You can add more routes here as needed */}
          </Routes>
        </div>
    </Router>
  );
}

export default App;

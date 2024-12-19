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
import IdCardList from './Pages/IDCardList';
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

function App() {
  return (
    <Router> {/* Wrap everything in Router to enable routing */}        
        <div>
          <Routes>
            {/* Define the route for the dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student-sidebar" element={<StudnetSidebar />} />
            <Route path="/query" element={<AdmissionQuery/>} />
            <Route path="/visitor" element={<VisitorBook/>} />
            <Route path="/complaint" element={<ComplaintBook/>} />
            <Route path="/postal" element={<PostalReceive/>} />
            <Route path="/postalDispatch" element={<PostalDispatch/>} />
            <Route path="/calllog" element={<PhoneCallLog/>} />
            <Route path="/cardList" element={<IdCardList/>} />
            <Route path="/certificate" element={<CertificatePage/>} />
            <Route path="/generate-certificate" element={<GenerateCertificate/>} />
            <Route path="/generate-idcard" element={<GenerateIdCard/>} />
            <Route path="/optional-subject" element={<OptionalSubject/>} />
            <Route path="/section" element={<SectionPage/>} />
            <Route path="/class" element={<ClassPage/>} />
            <Route path="/subject" element={<SubjectPage/>} />
            <Route path="/assign-teacher" element={<AssignClassTeacherPage/>} />
            <Route path="/assign-subject" element={<AssignSubjectPage/>} />
            <Route path="/classroom" element={<ClassRoomPage/>} />
            <Route path="/classroutine" element={<ClassRoutineCreate/>} />
            <Route path="/updatecontent" element={<UploadContent/>} />
            <Route path="/assignment" element={<AssignmentList/>} />
            <Route path="/syllabus" element={<SyllabusList/>} />
            <Route path="/downloads" element={<OtherDownloadsList/>} />
            <Route path="/lesson" element={<AddLesson/>} />
            <Route path="/topic" element={<AddTopic/>} />
            <Route path="/topicoverview" element={<TopicOverview/>} />
            <Route path="/lessonplan" element={<LessonPlanCreate/>} />
            <Route path="/lessonplanoverview" element={<LessonPlanOverview/>} />
            <Route path="/payroll" element={<PayrollBulkPrint/>} />
            <Route path="/feesinvoice" element={<FeesInvoiceBulkPrint/>} />
            <Route path="/feesinvoicesetting" element={<FeesInvoiceSettings/>} />
            <Route path="/content" element={<ContentTypePage/>} />
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
            <Route path="/vehicle" element={<VehiclePage/>} />
            <Route path="/assignvehicle" element={<AddAssignVehicle/>} />
            <Route path="/addexam" element={<AddExamType/>} />
            <Route path="/examsetup" element={<ExamSetup/>} />
            <Route path="/examshedule" element={<ExamSchedule/>} />
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
            <Route path="/class-routine" element={<ClassRoutinePage/>} />
            <Route path="/student-lessonplan" element={<LessonPlanPage/>} />
            <Route path="/student-lessonplan-overview" element={<LessonPlanOverviewStudent/>} />
            <Route path="/student-homework" element={<StudentHomeworkList/>} />
            <Route path="/student-assignment" element={<StudentAssignmentList/>} />
            <Route path="/student-syllabus" element={<StudentSyllabusList/>} />
            <Route path="/student-attendance" element={<StudentAttendanceList/>} />
            <Route path="/apply-leave" element={<ApplyLeave/>} />
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
            <Route path="/sidebar" element={<Sidebar/>} />


































































































































            {/* You can add more routes here as needed */}
          </Routes>
        </div>
    </Router>
  );
}

export default App;

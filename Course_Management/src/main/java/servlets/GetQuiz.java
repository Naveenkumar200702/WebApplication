package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import model.GetQuizQuestion;
import model.IsCourseRegistered;

/**
 * Servlet implementation class GetQuiz
 */
@WebServlet("/GetQuiz")
public class GetQuiz extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public GetQuiz() {
        super();
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		IsCourseRegistered isRegister=new IsCourseRegistered();
		GetQuizQuestion quiz=new GetQuizQuestion();
		String courseid=request.getParameter("courseid");
		HttpSession session = request.getSession();
		String userName=(String)session.getAttribute("name");
		int val=isRegister.isRegistered(Integer.parseInt(courseid),userName);
		if(val>=30)
		{
			JSONObject result=quiz.getQuizQuestion(Integer.parseInt(courseid));
			response.getWriter().append(result.toString());		
		}
		else {
			response.getWriter().print(-2);
		}
	}

}

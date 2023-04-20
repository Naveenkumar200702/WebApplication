package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.QuizScoreStore;


@WebServlet("/QuizScore")
public class QuizScore extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
    public QuizScore() {
        super();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String courseid=request.getParameter("courseid");
		String marks=request.getParameter("mark");
		HttpSession session = request.getSession();
		String userName=(String) session.getAttribute("name");
		String totalmarks=request.getParameter("totalQuestion");
		QuizScoreStore quizScoreStore=new QuizScoreStore();
		float result=quizScoreStore.addScore(courseid,marks,userName,totalmarks);
		response.getWriter().print(String.valueOf(result));
	}
}

package servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import model.LoginCheck;

@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Login() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String username = request.getParameter("username");
		username = username.trim();
		String password = request.getParameter("password");
		String choice = request.getParameter("choice");
		JSONObject details = new JSONObject();
		details.put("username", username);
		details.put("password", password);
		details.put("option", choice);
		LoginCheck obj = new LoginCheck();
		int value = obj.loginCheck(details);
		HttpSession session = request.getSession();

			String s = "";
			if (value > 1&&value<4) {
				session.setAttribute("name", username);
				session.setAttribute("option", choice);
				String officialName=obj.getpName();
				session.setAttribute("ofName", officialName);
			}
			s = (String) session.getAttribute("name");
			System.out.println(s + " session started");
			response.getWriter().append(Integer.toString(value));
		

	}
}

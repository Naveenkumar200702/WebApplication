package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import model.CheckUser;

@WebServlet("/Checkuser")
public class Checkuser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Checkuser() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String username = request.getParameter("username").trim();
		String user = request.getParameter("user").trim();
		JSONObject obj = new JSONObject();
		obj.put("Username", username);
		obj.put("User", user);
		CheckUser object = new CheckUser();
		int value = object.checkUser(username, user);
		response.getWriter().append("" + value);
	}
}

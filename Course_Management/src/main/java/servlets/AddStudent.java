package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import com.google.gson.Gson;

import dto.NewStudent;
import model.AddUsers;

@WebServlet("/AddStudent")
public class AddStudent extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AddStudent() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
		String json = "";
		if (br != null) {
			json = br.readLine();
			System.out.println(json + " works");
		}
		Gson g = new Gson();
		NewStudent obj = g.fromJson(json, NewStudent.class);
		AddUsers object = new AddUsers();
		int value = object.addStudent(obj);
		response.getWriter().append("" + value);
	}

}

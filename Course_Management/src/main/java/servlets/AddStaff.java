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

import dto.NewStaff;
import dto.NewStudent;
import model.AddUsers;

@WebServlet("/AddStaff")
public class AddStaff extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AddStaff() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
		String staffDetail = "";
		if (br != null) {
			staffDetail = br.readLine();
			System.out.println(staffDetail + " works");
		}

		Gson g = new Gson();
		NewStaff obj = g.fromJson(staffDetail, NewStaff.class);
		AddUsers instance = new AddUsers();
		int result = instance.addStaff(obj);
		response.getWriter().append("" + result);
	}

}

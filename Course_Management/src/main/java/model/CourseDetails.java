package model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.json.JSONObject;

import dbcon.Connect;



public class CourseDetails {

	public JSONObject getCourseDetails() {
		String select_query = "SELECT * FROM course_details;";
		JSONObject courseDetail = new JSONObject();
		try {
			Connection con = Connect.getInstance().con;
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(select_query);

			int i = 0;
			while (rs.next()) {
				JSONObject course = new JSONObject();
				course.put("name", rs.getString("course_title"));
				course.put("courseid", rs.getInt("course_id"));
				course.put("duration", rs.getInt("course_duration"));
				course.put("staff", rs.getString("staff_name"));		
				course.put("staffId", rs.getString("staff_id"));
				course.put("rmaterial", rs.getString("reading_material"));
				courseDetail.put("" + i, course);
				i++;
			}
			return courseDetail;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return courseDetail;
	}

}

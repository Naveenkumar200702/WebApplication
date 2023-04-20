package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.json.JSONObject;

import dbcon.Connect;

public class GetStaffCourse {
	public JSONObject getStaffCourse(String userName){
		Connection con=Connect.getInstance().con;
		String SELECT_QUERY="SELECT * FROM course_details WHERE staff_id=?";
		JSONObject outer=new JSONObject();
		System.out.println(userName);
		try {
			PreparedStatement ps=con.prepareStatement(SELECT_QUERY);
			ps.setString(1, userName);
			int i=0;
			ResultSet rs=ps.executeQuery();
			while(rs.next()) {
				JSONObject course = new JSONObject();
				course.put("name", rs.getString("course_title"));
				course.put("courseid", rs.getInt("course_id"));
				course.put("duration", rs.getInt("course_duration"));
				course.put("staff", rs.getString("staff_name"));		
				course.put("staffId", rs.getString("staff_id"));
				course.put("rmaterial", rs.getString("reading_material"));
				outer.put("" + i, course);
				i++;
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return outer;
	}

}

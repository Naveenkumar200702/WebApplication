package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.json.JSONObject;

import dbcon.Connect;

public class GetMyCourseDetail {
	public JSONObject getMyCourseDetail(String userName) {
		Connection con=Connect.getInstance().con;
		String SELECT_COURSEID="SELECT * FROM course_registration where studentid=?";
		String GET_COURSE="SELECT * FROM course_details WHERE course_id=?";
		JSONObject outer=new JSONObject();
		int i=0;
		try {
			PreparedStatement ps=con.prepareStatement(SELECT_COURSEID);
			ps.setString(1, userName);
			ResultSet rs1=ps.executeQuery();
			while(rs1.next()){
				PreparedStatement prepStatement=con.prepareStatement(GET_COURSE);
				int courseid=rs1.getInt("courseid");
				prepStatement.setInt(1, courseid);
				ResultSet rs=prepStatement.executeQuery();
				if(rs.next())
				{
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
				prepStatement.close();	
			}
		}catch(Exception e) {
			e.printStackTrace();
		}	
		return outer;
	}

}

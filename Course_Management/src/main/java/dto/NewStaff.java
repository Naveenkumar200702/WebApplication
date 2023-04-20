package dto;

public class NewStaff {
	private String user;
	private String mail;
	private String name;
	private String password;
	private String dob;
	private String qualification;
	private String experience;
	private String phoneNo;
	
	public NewStaff(String user, String mail, String name, String password, String dob, String qualification,
			String experience,String phoneNo) {
		super();
		this.user = user;
		this.mail = mail;
		this.name = name;
		this.password = password;
		this.dob = dob;
		this.qualification = qualification;
		this.experience = experience;
		this.phoneNo=phoneNo;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
}

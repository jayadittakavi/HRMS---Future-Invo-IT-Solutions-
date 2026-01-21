const response = await fetch(
    "http://192.168.1.4:5000/api/auth/super-admin/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }
);

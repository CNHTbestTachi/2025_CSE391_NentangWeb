$(document).ready(function () {
  $.validator.addMethod(
    "strictEmail",
    function (value, element) {
      return (
        this.optional(element) ||
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(value)
      );
    },
    "Email không đúng định dạng. Ví dụ: example@gmail.com"
  );

  $("#deleteBtn").on("click", function () {
    const result = confirm("Bạn có chắc chắn muốn xóa hay không?");
    if (result === true) {
      $("#showText").show();
    }
  });

  $("#demoForm").validate({
    rules: {
      username: {
        required: true,
        maxlength: 32,
      },
      name: {
        required: true,
        maxlength: 15,
      },
      email: {
        required: true,
        strictEmail: true,
        email: true,
        maxlength: 30,
      },
      password: {
        required: true,
        minlength: 8,
      },
      "re-password": {
        equalTo: "#password",
        minlength: 8,
      },
    },
    messages: {
      username: {
        required: "Vui lòng nhập username!",
        maxlength: "Không vượt quá 32 ký tự.",
      },
      name: {
        required: "Vui lòng nhập họ tên!",
        maxlength: "Không vượt quá 15 ký tự.",
      },
      email: {
        required: "Vui lòng nhập email!",
        strictEmail: "Email không đúng định dạng. Ví dụ: example@gmail.com",
        maxlength: "Không vượt quá 30 ký tự.",
      },
      password: {
        required: "Vui lòng nhập mật khẩu!",
        minlength: "Mật khẩu tối thiểu 8 ký tự.",
      },
      "re-password": {
        equalTo: "Mật khẩu nhập lại không khớp!",
        minlength: "Mật khẩu tối thiểu 8 ký tự.",
      },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("error");
      element.next("span.error").remove();
      element.after(error);
    },
    submitHandler: function (form) {
      alert("✅ Form hợp lệ và đã gửi thành công!");
      form.reset();
    },
  });
});

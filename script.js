let userIndex = 0;

function saveUserInfo() {
    const userName = $('#nameInput').val();
    const userAddress = $("#addressInput").val();
    
    if(userName.trim() === "" || userAddress.trim() === "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    
    const userInfo = {
        name : userName,
        address : userAddress
    };

    const userInfoJSON = JSON.stringify(userInfo);
    addToTable(userName, userAddress, userInfoJSON);

    // Sửa 1: Đổi thành nameInput để reset đúng ô
    $("#nameInput").val('');
    $("#addressInput").val('');
}

function addToTable(userName, userAddress, userInfoJSON) {
    userIndex++;
    const table = $('#userTable tbody');
    const newRow = `<tr>
        <td>${userIndex}</td>
        <td>${userName}</td>
        <td>${userAddress}</td>
        <td>${userInfoJSON}</td>
        <td><input type="checkbox" class="deleteCheckbox" onchange="toggleDeleteInput()"></td>
    </tr>`;

    table.append(newRow);
}

function deleteUser() {
    const checkboxes = $(".deleteCheckbox");
    const table = $('#userTable tbody'); // Sửa 2: Thêm dấu #
    let anyChecked = false;
    
    // Sửa 3: Sửa lỗi chính tả chữ "length"
    for(let i = checkboxes.length - 1 ; i >= 0 ; i--) {
        if(checkboxes[i].checked) {
            anyChecked = true;
            $(checkboxes[i]).closest('tr').remove();
            userIndex--;
        }
    }

    // Sửa 4: Sửa sai tên biến (anyChecked chứ không phải anyCheck)
    if(!anyChecked) {
        const deleteIndex = $('#deleteIndex').val();

        if(deleteIndex.trim() === '' || isNaN(deleteIndex) || deleteIndex <= 0 || deleteIndex > userIndex) {
            alert("Vui lòng nhập chỉ số hợp lệ");
            return;
        }

        $('#userTable tbody tr').eq(deleteIndex - 1).remove();
        userIndex--;
    }

    updateRowIndexes();
    toggleDeleteInput();
}

function updateRowIndexes() {
    $('#userTable tbody tr').each(function(index) {
       $(this).find('td:first').text(index + 1);
    });
}

function toggleDeleteInput() {
    const checkboxes = $('.deleteCheckbox');
    let anyChecked = false;

    checkboxes.each(function() {
       if($(this).is(':checked')) {
        anyChecked = true;
       }
    });

    $('#deleteIndex').prop('disabled', anyChecked);
}

$(document).ready(function() {
    $('#saveButton').on('click', saveUserInfo);
    $('#deleteButton').on('click', deleteUser);
    
    // Sửa 5: Chỉ thực thi lệnh saveUserInfo khi bấm phím Enter (mã phím là 'Enter')
    $('#userForm').on('keydown', function(event) {
        if(event.key === 'Enter') {
            event.preventDefault(); // Ngăn form tự load lại trang
            saveUserInfo();
        }
    });
});
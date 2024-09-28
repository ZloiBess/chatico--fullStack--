class UserDto {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.age = user.age;
        this.avatar = user.avatar || 'default.jpg';
    }
}

export default UserDto;

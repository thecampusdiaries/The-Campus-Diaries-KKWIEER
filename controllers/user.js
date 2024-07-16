const User = require('../models/user.js')
const Post = require('../models/post.js')
const Event = require('../models/event.js')

module.exports.getSignupForm = (req, res, next) => {
    res.render('user/signup.ejs')
}

module.exports.signup = async (req, res) => {
    let { username, email, password } = req.body
    pw = password
    const newUser = new User({ email, pw, username })
    newUser.profile.profileImage = {
        url: "https://res.cloudinary.com/duwrgtvqv/image/upload/v1719633471/default_picture.png",
        filename: "default_profile_picture"
    }
    const regUser = await User.register(newUser, password)
    req.login(regUser, (err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", `@${username}, Welcome to Campus Diaries, KKWIEER`)
        res.render('user/editUserProfile.ejs', { user: regUser, fromSignUp: true, imgUrl: regUser.profile.profileImage.url });

    })
}

module.exports.getLoginForm = (req, res) => {
    res.render('user/login.ejs')
}

module.exports.login = async (req, res) => {
    req.flash("success", `@${req.body.username}, Welcome back to Campus Diaries, KKWIEER!!`)
    url = res.locals.redirectUrl ? res.locals.redirectUrl : '/'
    res.redirect(url)
}

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        req.flash("success", "You have been logged out successfully")
        return res.redirect('/')
    })
}

module.exports.showUser = async (req, res) => {
    const requiredUser = await User.findById(req.params.userId);
    if (!requiredUser) {
        req.flash('error', 'User not found !!');
        return res.redirect('/');
    }

    const posts = await Post.find({ owner: req.params.userId });
    const events = await Event.find({ organizer: req.params.userId })
        .populate('posts');

    return res.render('user/showUserProfile.ejs', { user: requiredUser, posts, events });
};

module.exports.renderEditProfileForm = async (req, res) => {
    const { userId } = req.params;
    const reqUser = await User.findById(userId);
    if (!reqUser) {
        req.flash('error', 'Cannot find that user!');
        return res.redirect('/');
    }
    let imgUrl = reqUser.profile.profileImage.url;
    // imgUrl = imgUrl.replace('/upload', '/upload/w_250')
    res.render('user/editUserProfile.ejs', { user: reqUser, fromSignUp: false, imgUrl });
}

module.exports.editProfile = async (req, res) => {
    const { userId } = req.params;
    const { username, email, profile, role } = req.body.user;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
        req.flash('error', 'User not found');
        return res.redirect('/explore');
    }
    let isNewUser = existingUser.profile.bio == null
    if (username) existingUser.username = username;
    if (email) existingUser.email = email;
    if (profile && profile.bio) existingUser.profile.bio = profile.bio;
    if (role) existingUser.role = role;

    if (req.file) {
        console.log('uploading new image');
        const url = req.file.path;
        const filename = req.file.filename;
        console.table([url, filename]);
        existingUser.profile.profileImage = { url, filename };
    }

    if(!existingUser.isProfileComplete && existingUser.role != 'organizer') {
        existingUser.isProfileComplete = true;
    }

    await existingUser.save();
    req.login(existingUser, (err) => {
        if (err) {
            req.flash('error', 'There was an error updating your session.');
            return res.redirect('/explore');
        }

        if(existingUser.role == 'organizer' && !existingUser.isProfileComplete) {
            req.flash('success', 'Your profile is sent for admin verification. Kindly wait before starting to post');
        } else {
            req.flash('success', 'Your Profile updated successfully!');
        }
        return isNewUser? res.redirect('/explore') : res.redirect(`/users/${userId}/profile`);
    });
};

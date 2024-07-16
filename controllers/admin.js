const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');

module.exports.getApprovals = async (req, res) => {
    const unApprovedClubs = await User.find({role: 'organizer', isProfileComplete: false});
    res.render('admin/approvals.ejs', {unApprovedClubs})
}

module.exports.approve = async(req, res) => {
    const {clubId} = req.body;

    const club = await User.findById(clubId);
    if(!club || club.role != 'organizer') {
        throw new ExpressError(404, 'This organizer does not exist.')
    }
    club.isProfileComplete = true;
    await club.save();
    res.status(200).send('Club approved successfully');
}

// Route to approve all clubs
module.exports.approveAll = async (req, res) => {
    await User.updateMany({ role: 'club', isProfileComplete: false }, { isProfileComplete: true });
    res.redirect('/explore');
    req.flash('success', 'All organizers approved successfully')
};
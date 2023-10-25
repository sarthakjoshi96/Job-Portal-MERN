import jobModel from "../models/jobModel.js"
import userModel from "../models/userModel.js"

export const createJobController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next('Fields are missing')
    }

    req.body.createdBy = req.user.userId
    const job = await jobModel.create(req.body);
    res.status(201).json({ job })
}

export const getAllJobsController = async (req, res, next) => {

    const jobs = await jobModel.find({ status: "pending" });
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,
    })
}

export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    //find job
    const job = await jobsModel.findOne({ _id: id });
    //validation
    if (!job) {
        next(`No Job Found With This ID ${id}`);
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("Your Not Authorize to delete this job");
        return;
    }
    await job.deleteOne();
    res.status(200).json({ message: "Success, Job Deleted!" });
};

// =======  JOBS STATS & FILTERS ===========
export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        // search by user jobs
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        },
    ]);

    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0,
    };

    //monthly yearly stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    monthlyApplication = monthlyApplication
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = moment()
                .month(month - 1)
                .year(year)
                .format("MMM Y");
            return { date, count };
        })
        .reverse();
    res
        .status(200)
        .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
};

export const applyJobsController = async (req, res, next) => {
    const { jobId } = req.body
    if (!jobId) {
        next('Fields are missing')
    }
    //find job
    const userId = req.user.userId
    try {
        const user = await userModel.findById(userId);
        if (user) {
            user.appliedJobs.push(jobId); // Append the job ID to the appliedJobs array
            await user.save(); // Save the updated user
            console.log('Applied job ID added to user:', user);
        } else {
            console.error('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }

    res.status(200).json({ message: "Successfully applied!" });
};


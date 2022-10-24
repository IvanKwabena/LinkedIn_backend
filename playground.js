// // Update a User
// router.patch('/:id', async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findByIdAndUpdate(
//       userId,
//       {
//         name: req.body.name,
//         email: req.body.email,
//         passwordHash: req.body.passwordHash,
//         birthday: req.body.birthday,
//         headline: req.body.headline,
//         industry: req.body.industry,
//         education: req.body.education,
//         location: req.body.location,
//         phone: req.body.phone,
//         address: req.body.address,
//       },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ message: 'User to update does not exist' });
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// // Post a User
// router.post('/', async (req, res) => {
//   let user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     passwordHash: req.body.passwordHash,
//     birthday: req.body.birthday,
//     headline: req.body.headline,
//     industry: req.body.industry,
//     education: req.body.education,
//     location: req.body.location,
//     phone: req.body.phone,
//     address: req.body.address,
//   });

//   user = await user.save();

//   try {
//     res.send(user);
//   } catch (error) {
//     res.status(4000).send(error);
//   }
// });
let nums = [1, 2, 3, 4, 5, 7, 8];
let t = nums.length - 2;
target = 15;
console.log(nums.indexOf(7, t));

var twoSum = (array, target) => {
  if (array.length === 0) {
    return [0, 1];
  }

  let i = 0;
  let j = array.length - 1;

  while (i < j) {
    if (array[i] + array[j] == target) {
      break;
    } else if (array[i] + array[j] > target) {
      j -= 1;
    } else if (array[i] + array[j] < target) {
      i += 1;
    }
  }
  a = array.indexOf(i) + 1;
  b = array.indexOf(j, -1);
  //   a = array[i];
  //   b = array[j];
  //   console.log(a);
  //   console.log(b);
  //   return [a];
};

twoSum(nums, target);

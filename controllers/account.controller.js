const Account = require('../models/account.model');

module.exports = {
  getAccounts: async (req, res) => {
    try {
      const users = await Account.find();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await Account.findOne({ username, password });
      if (!user) {
        return res
          .status(404)
          .json({ error: 'Tài khoản hoặc mật khẩu không đúng!' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng nhập' });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, phone, address } = req.body;

      // Kiểm tra xem người dùng đã tồn tại trong CSDL hay chưa
      const existingAccount = await Account.findOne({ username });
      if (existingAccount) {
        return res.status(400).json({ error: 'Tài khoản đã tồn tại' });
      }

      // Tạo tài khoản mới
      const account = {
        username,
        password,
        phone,
        address,
      };

      // Lưu tài khoản vào CSDL
      const new_account = await Account.create(account);

      return res.status(201).json(new_account);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Đã xảy ra lỗi khi đăng ký tài khoản' });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const accountId = req.params.id;

      // Kiểm tra xem tài khoản có tồn tại trong CSDL hay không
      const existingAccount = await Account.findById(accountId);
      if (!existingAccount) {
        return res.status(404).json({ error: 'Không tìm thấy tài khoản' });
      }

      // Xóa tài khoản
      await Account.findByIdAndDelete(accountId);

      return res.status(200).json({ message: 'Xóa tài khoản thành công' });
    } catch (error) {
      return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa tài khoản' });
    }
  },

  update: async (req, res) => {
    try {
      const accountId = req.params.id;
      const body = req.body;

      // Kiểm tra xem tài khoản có tồn tại trong CSDL hay không
      const existingAccount = await Account.findById(accountId);
      if (!existingAccount) {
        return res.status(404).json({ error: 'Không tìm thấy tài khoản' });
      }

      // Cập nhật thông tin tài khoản
      const updated_account = await Account.findByIdAndUpdate(accountId, body, {
        new: true,
      });

      return res.status(200).json(updated_account);
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Đã xảy ra lỗi khi cập nhật tài khoản' });
    }
  },
};

export const checkAdmin = (req, res, next) => {
  // const user = req.user || { role: "admin" }; 
  // if (!user || user.role !== "admin") {
    //   return res.status(403).json({ error: "Access denied. Admins only." });
    // }
    // next();

    // Dummy user (za test) koji propusta sve zahteve → kasnije dolazi iz Clerk-a
  req.user = { role: "admin" }; 
  next();
};

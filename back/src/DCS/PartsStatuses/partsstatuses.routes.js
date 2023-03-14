const express = require("express")
const router = express.Router()
const PartsStatusActions = require('./partsstatuses.api')

router.get('/all', PartsStatusActions.AllPartsStatus);
router.get('/:id', PartsStatusActions.GetPartsStatus);
router.get('/last/:id', PartsStatusActions.LastPartsStatus);
router.post('/add', PartsStatusActions.AddPartsStatus);
router.put('/:id', PartsStatusActions.UpdatePartsStatus);
router.delete('/:id', PartsStatusActions.DeletePartsStatus);

module.exports = router;
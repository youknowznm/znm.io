const shortid = require('shortid')
const {assertNoError, validateIp} = require('../utils')
const {
  saveComment,
  getCommentsByArticleId,
  deleteComment,
} = require('../proxy/comment')

module.exports = (app) => {

  // app.use('/saveComment', authMiddleware)
  // app.use('/deleteComment', authMiddleware)

  // 保存评论，需要检查 ip
  app.use('/saveComment', validateIp)
  app.post('/saveComment', (req, res) => {
    const params = Object.assign({}, req.body)
    params._id = shortid.generate()
    saveComment(params, (result) => {
      if (typeof result._id === 'string') {
        res.status(200).json({msg: 'Save comment successful.'})
      } else if (result.err.name === 'ValidationError') {
        res.status(400).json({msg: 'Invalid fields. Please check your input.'})
      } else {
        res.status(500).json({msg: 'Server Error. Please try again later.'})
      }
    })
  })

  // 获取符合目标 id 的文章下的评论，必须在 query 中提供 id。id 为空字符串时则返回所有留言
  app.get('/comment', (req, res) => {
    const {articleId} = req.query
    if (articleId === undefined) {
      res.status(400).json({msg: 'Target [articleId] is required in query.'})
    } else {
      getCommentsByArticleId(articleId, (commentDoc) => {
        res.status(200).json({
          comment: commentDoc,
          msg: 'Get target comments successful.'
        })
      })
    }
  })

  // 删除符合目标 id 的评论，必须在 query 中提供 id，需要管理员登录
  app.post('/deleteComment', (req, res) => {
    const {articleId} = req.query
    if (articleId === undefined) {
      res.status(400).json({msg: 'Comment id query is required.'})
      return
    }
    getCommentById(articleId, (commentDoc) => {
      if (commentDoc === null) {
        res.status(404).json({msg: 'No comments matching target id was found.'})
        return
      }
      // 管理员可删除任意评论，作者可删除自己的评论
      if (req.ip === commentDoc.authorIp || req.session.adminLoggedIn === true) {
        deleteComment(articleId, (result) => {
          if (result === true) {
            res.status(200).json({msg: 'Delete comment successful.'})
          } else {
            res.status(500).json({msg: 'Server Error. Please try again later.'})
          }
        })
      } else {
        res.status(403).json({msg: 'Only admin and comment author can delete it.'})
      }
    })
  })

}

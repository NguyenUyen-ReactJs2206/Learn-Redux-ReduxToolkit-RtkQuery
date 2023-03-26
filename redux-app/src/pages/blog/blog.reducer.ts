import { createReducer, createAction, current, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from '../../constants/blog'
import { Post } from '../../types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initialPostList,
  editingPost: null
}

//Add
export const addPost = createAction<Post>('blog/addPost')
//Delete
export const deletePost = createAction<string>('blog/deletePost')
//Edit
export const startEditingPost = createAction<string>('/blog/startEditingPost')
export const cancelEditingPost = createAction('/blog/cancelEditingPost')
export const finishEditingPost = createAction<Post>('/blog/finishEditingPost')

const blogReducer = createReducer(initialState, (builder) => {
  //add trường hợp vào, nhận vào 2 tham số: 1: addPost, 2: callback
  builder
    .addCase(addPost, (state, action) => {
      // thư viện immerjs - giúp chúng ta mutate 1 state an toàn
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      if (foundPostIndex !== -1) {
        // splice (2,1) : xoa phan tu o vi tri thu 2 va chi xoa 1 phan tu
        state.postList.splice(foundPostIndex, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    })
    .addCase(cancelEditingPost, (state) => {
      state.editingPost = null
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id
      //ham some dung lai khi return true
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
    .addMatcher(
      (action) => action.type.includes('cancel'),
      (state, action) => {
        console.log(current(state))
      }
    )
})

// const blogReducer = createReducer(
//   initialState,
//   {
//     //add trường hợp vào, nhận vào 2 tham số: 1: addPost, 2: callback
//     [addPost.type]: (state, action: PayloadAction<Post>) => {
//       // thư viện immerjs - giúp chúng ta mutate 1 state an toàn
//       const post = action.payload
//       state.postList.push(post)
//     },
//     [deletePost.type]: (state, action) => {
//       const postId = action.payload
//       const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
//       if (foundPostIndex !== -1) {
//         // splice (2,1) : xoa phan tu o vi tri thu 2 va chi xoa 1 phan tu
//         state.postList.splice(foundPostIndex, 1)
//       }
//     },
//     [startEditingPost.type]: (state, action) => {
//       const postId = action.payload
//       const foundPost = state.postList.find((post) => post.id === postId) || null
//       state.editingPost = foundPost
//     },
//     [cancelEditingPost.type]: (state) => {
//       state.editingPost = null
//     },
//     [finishEditingPost.type]: (state, action: PayloadAction<Post>) => {
//       const postId = action.payload.id
//       //ham some dung lai khi return true
//       state.postList.some((post, index) => {
//         if (post.id === postId) {
//           state.postList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     }
//   },
//   [
//     {
//       matcher: ((action: any) => action.type.includes('cancel')) as any,
//       reducer(state, action) {
//         console.log(current(state))
//       }
//     }
//   ],
//   (state) => {
//     console.log(state)
//   }
// )

export default blogReducer

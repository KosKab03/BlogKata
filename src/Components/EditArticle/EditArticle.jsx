import CreateArticlePage from '../CreateArticlePage';
import { fetchArticle, resetArticleView } from '../../Store/ArticlesSlice';

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function EditArticle() {
  const articleFromState = useSelector((state) => state.articles.articleView);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [author, setAuthor] = useState();
  const [article, setArticle] = useState();

  useEffect(() => {
    if (!articleFromState) {
      dispatch(fetchArticle(slug));
    } else {
      const { title, description, body, tagList } = articleFromState;
      let newTagList;
      if (!tagList.length) {
        newTagList = [{ value: '' }];
      } else {
        newTagList = tagList.map((el) => ({ value: el }));
      }
      const data = {
        title,
        description,
        text: body,
        tagList: newTagList,
      };
      setArticle(data);
      setAuthor(articleFromState.author.username);
    }
    return () => {
      dispatch(resetArticleView());
      setArticle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{article && <CreateArticlePage articleInfo={article} author={author} />};</>;
}

export default EditArticle;

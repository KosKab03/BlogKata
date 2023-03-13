/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import styles from './CreateArticlePage.module.scss';

import HOCCommonBlock from '../HOCs/HOCCommonBlock';
import { postCreateArticle, updArticle, resetCreateArticle } from '../../Store/CreateArticle';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function CreateArticlePage({
  articleInfo = {
    tagList: [{ value: '' }],
  },
  author,
}) {
  const { status, slugArticle } = useSelector((state) => state.createArticle);
  const { slug } = useParams();
  const slugName = slug || slugArticle;

  const dispatch = useDispatch();
  const user = localStorage.getItem('username');

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onBlur',
    defaultValues: articleInfo,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  if (status === 'resolved' || (user !== author && author)) {
    setTimeout(() => {
      dispatch(resetCreateArticle());
    }, 1000);
    return <Navigate to={`/articles/${slugName}`} />;
  }

  const onSubmit = (data) => {
    const newData = { ...data };
    if (data.tagList[0].value === '') {
      delete newData.tagList;
    } else {
      newData.tagList = newData.tagList.map((tag) => tag.value);
    }
    if (author) {
      dispatch(updArticle({ newData, slug }));
    } else {
      dispatch(postCreateArticle(newData));
    }
  };

  const tagRequired = !!(fields.length > 1 && fields[fields.length - 1]);

  return (
    <HOCCommonBlock>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new article</h2>
        <ul className={styles['block-inputs']}>
          <li>
            <label>
              Title
              <input placeholder="Title" {...register('title', { required: true })} />
              {errors.title && <span style={{ color: 'red' }}>required field</span>}
            </label>
          </li>
          <li>
            <label>
              Short description
              <input placeholder="Short description" {...register('description', { required: true })} />
              {errors.description && <span style={{ color: 'red' }}>required field</span>}
            </label>
          </li>
          <li>
            <label>
              Text
              <textarea placeholder="text" name="Text1" rows="5" {...register('text', { required: true })} />
              {errors.text && <span style={{ color: 'red' }}>required field</span>}
            </label>
          </li>
          <li>
            <ul className={styles.tags}>
              Tags
              {fields.map((field, index) => (
                <li key={field.id}>
                  <label className={styles.tag}>
                    <input
                      placeholder="Tag"
                      {...register(`tagList.${index}.value`, {
                        required: tagRequired,
                        minLength: 1,
                      })}
                    />
                    <button
                      type="button"
                      className={styles['delete-btn']}
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(index);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className={styles['add-tag-btn']}
                      onClick={() => {
                        if (control._formValues.tagList[index].value) {
                          append({ value: '' });
                        }
                      }}
                    >
                      Add tag
                    </button>
                  </label>
                </li>
              ))}
            </ul>
            {errors.tagList && (
              <span style={{ color: 'red' }}>
                The tag cannot be an empty string, or fill in the field, or remove the empty tag
              </span>
            )}
          </li>
        </ul>
        {status === 'loading' && <span>sendi=ng data to the server...</span>}
        {status === 'error' && (
          <span style={{ color: 'red' }}>something went wrong, please try again later. Sorry...</span>
        )}
        {status === 'resolved' && <span>Data sent to server! YoHu {'>-<'}</span>}
        <button type="submit" className={styles['submit-btn']}>
          Send
        </button>
      </form>
    </HOCCommonBlock>
  );
}

export default CreateArticlePage;

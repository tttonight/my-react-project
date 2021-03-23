/**
 * 小组件
 */
// import React from 'react';
import styled from 'styled-components';

/**
 * 容器样式
 * @param {boolean} noPadding 是否有padding，默认为true
 */
export const ContainerBody = styled.div`{
    height: 100%;
    padding: ${({ noPadding = true }) => noPadding ? '24px' : 0};
    overflow: auto;
}`;
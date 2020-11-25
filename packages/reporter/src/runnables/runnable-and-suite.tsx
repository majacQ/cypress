import _ from 'lodash'
import { observer } from 'mobx-react'
import React, { Component } from 'react'

import { indentPadding } from '../lib/util'
import { SuiteModel } from './suite-model'
import { TestModel } from '../test/test-model'

import { Expandable, ExpandableProps } from '../collapsible/expandable'
import { Test } from '../test/test'

interface SuiteProps {
  model: SuiteModel
  style?: React.CSSProperties
}

export const Suite = observer(({ model }: SuiteProps) => {
  if (!model.shouldRender) return null

  return (
    <div className='runnable-title'>
      {model.title}
    </div>
  )
})

export interface RunnableProps {
  model: TestModel | SuiteModel
  style: React.CSSProperties
  expandableProps: ExpandableProps
}

// NOTE: some of the driver tests dig into the React instance for this component
// in order to mess with its internal state. converting it to a functional
// component breaks that, so it needs to stay a Class-based component or
// else the driver tests need to be refactored to support it being functional
@observer
export class Runnable extends Component<RunnableProps> {
  render () {
    const { model, style, expandableProps } = this.props

    return (
      <div
        className={`${model.type} runnable runnable-state-${model.state}`}
        style={indentPadding(style, model.level)}
      >
        <Expandable expandableProps={expandableProps}>
          {model.type === 'test' ? <Test model={model as TestModel} /> : <Suite model={model as SuiteModel} />}
        </Expandable>
      </div>
    )
  }
}

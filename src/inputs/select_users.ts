import { Builder } from '../builder'
import type { MultiUsersSelect, UsersSelect } from '@slack/bolt'
import { actionable, confirmable, focusable, placeholderable } from '../mixins'

export class UsersSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<UsersSelect>)))) {
  private _initialUser?: string

  initialUser(initialUser: string): this {
    this._initialUser = initialUser
    return this
  }

  build(): UsersSelect {
    return {
      type: 'users_select',
      initial_user: this._initialUser, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

export class MultiUsersSelectBuilder extends actionable(confirmable(focusable(placeholderable(Builder<MultiUsersSelect>)))) {
  private _initialUsers?: string[]
  private _maxSelectedItems?: number

  initialUsers(initialUsers: string[]): this {
    this._initialUsers = [...initialUsers]
    return this
  }

  maxSelectedItems(maxSelectedItems: number): this {
    this._maxSelectedItems = maxSelectedItems
    return this
  }

  build(): MultiUsersSelect {
    return {
      type: 'multi_users_select',
      initial_users: this._initialUsers, // eslint-disable-line camelcase
      max_selected_items: this._maxSelectedItems, // eslint-disable-line camelcase
      action_id: this._actionId, // eslint-disable-line camelcase
      confirm: this._confirm,
      focus_on_load: this._focusOnLoad, // eslint-disable-line camelcase
      placeholder: this._placeholder,
    }
  }
}

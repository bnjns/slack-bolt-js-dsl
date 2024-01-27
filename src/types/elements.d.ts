import type {
  RichTextBroadcastMention,
  RichTextChannelMention,
  RichTextLink,
  RichTextTeamMention,
  RichTextText,
  RichTextUsergroupMention,
  RichTextUserMention,
} from '@slack/bolt'

export type RichTextListStyle = 'bullet' | 'ordered'

export type RichTextMention = RichTextBroadcastMention | RichTextChannelMention | RichTextTeamMention | RichTextUserMention | RichTextUsergroupMention
export type BroadcastMentionRange = 'here' | 'channel' | 'everyone'

export type PreformattedElement = RichTextText | RichTextLink

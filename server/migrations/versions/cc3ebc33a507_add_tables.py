"""Add tables

Revision ID: cc3ebc33a507
Revises: 
Create Date: 2023-06-15 17:29:16.050633

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "cc3ebc33a507"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("wishlists", schema=None) as batch_op:
        batch_op.drop_constraint("fk_wishlists_user_id_users", type_="foreignkey")
        batch_op.drop_column("user_id")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("wishlists", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column("user_id", sa.INTEGER(), autoincrement=False, nullable=True)
        )
        batch_op.create_foreign_key(
            "fk_wishlists_user_id_users", "users", ["user_id"], ["id"]
        )

    # ### end Alembic commands ###
